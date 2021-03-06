import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
// @material-ui/icons
import Description from "@material-ui/icons/Description";
import Create from "@material-ui/icons/Create";
import Favorite from "@material-ui/icons/Favorite";
import Delete from "@material-ui/icons/Delete";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import NoteAdd from "@material-ui/icons/NoteAdd";
//import { dataTable } from "variables/general.jsx";
//import { dataTable } from "variables/sampleFormData.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//import { formListSaga } from "../../../redux/actions/formListAction";
import { formListSaga } from "../../../redux/actions/formListAction";
import { fetchFormTemplateList } from "../../../commonActions/commonReusableActions";

const styles = theme => ({
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class FormList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "",
      headerRow: [],
      data: []
    };
  }

  componentDidMount() {
    this.props.formListSaga();
  }

  handleNewReferralForm() {
    //this.props.testSaga();
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.formList_received_data);
    let completeDataList =
      nextProps.formList_received_data.formList != null
        ? fetchFormTemplateList(nextProps.formList_received_data.formList)
        : [];
    console.log("completeDataList", completeDataList);
    let displayReferralList =
      completeDataList.length !== 0
        ? completeDataList.dataRows.map((prop, key) => {
            return {
              id: key,
              _id: prop[0],
              form_id: prop[1],
              form_Name: prop[2],
              created_By: prop[3],
              created_Date: prop[4],
              actions: (
                // we've added some custom button actions
                <div className="actions-right">
                  {/* use this button to add a edit kind of action */}
                  <Button
                    justIcon
                    round
                    simple
                    onClick={() => {
                      let obj = this.state.data.find(o => o.id === key);
                      alert(
                        "You've clicked EDIT button on \n{ \nName: " +
                          obj.name +
                          ", \nposition: " +
                          obj.position +
                          ", \noffice: " +
                          obj.office +
                          ", \nage: " +
                          obj.age +
                          "\n}."
                      );
                    }}
                    color="esystemsGreen"
                    className="edit"
                  >
                    <Create />
                  </Button>{" "}
                  {/* use this button to remove the data row */}
                  <Button
                    justIcon
                    round
                    simple
                    onClick={() => {
                      var data = this.state.data;
                      data.find((o, i) => {
                        if (o.id === key) {
                          // here you should add some custom code so you can delete the data
                          // from this component and from your server as well
                          data.splice(i, 1);
                          return true;
                        }
                        return false;
                      });
                      this.setState({ data: data });
                    }}
                    color="danger"
                    className="remove"
                  >
                    <Delete />
                  </Button>{" "}
                </div>
              )
            };
          })
        : this.setState({ loading: true });
    this.setState({
      loading: nextProps.formList_received_data.loading,
      headerRow: completeDataList.headerRow,
      data: displayReferralList
    });
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state; //this.props.referralList_received_data
    let headerRow = [];
    var table = "";

    if (loading === true) {
      table = (
        <CircularProgress className={classes.progress} color="secondary" />
      );
    } else {
      console.log(this.state.data);
      headerRow = this.state.headerRow ? this.state.headerRow : [];
      table = (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="esystemsGreen">
                  <Description />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Manage Forms</h4>
              </CardHeader>
              <CardBody>
                <div style={{ textAlign: "right" }}>
                  <Button
                    color="esystemsGreen"
                    onClick={() => this.handleNewReferralForm()}
                  >
                    <NoteAdd />
                    New
                  </Button>
                </div>
                <ReactTable
                  data={this.state.data}
                  filterable
                  columns={[
                    {
                      Header: headerRow[0],
                      accessor: "_id"
                    },
                    {
                      Header: headerRow[1],
                      accessor: "form_id"
                    },
                    {
                      Header: headerRow[2],
                      accessor: "form_Name"
                    },
                    {
                      Header: headerRow[3],
                      accessor: "created_By"
                    },
                    {
                      Header: headerRow[4],
                      accessor: "created_Date"
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false
                    }
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }

    return <div>{table}</div>;
  }
}
/*const mapStateToProps = store => ({
  test: store.testReducer.test
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      testSaga
    },
    dispatch
  );*/

const mapStateToProps = store => ({
  formList_received_data: store.formList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      formListSaga
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormList));
