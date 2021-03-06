import { call, put, takeLatest, takeEvery, take } from "redux-saga/effects";
import axios from "axios";

//import { push } from "react-router-redux";

import {
  CREATE_REFERRAL_POST_POSTING,
  CREATE_REFERRAL_POST_POSTED,
  CREATE_REFERRAL_POST_ERROR
} from "../constants/index";

const url = "http://localhost:3003/api/forminstance";

const postCreateReferralFormData = forminstance => {
  return axios
    .post(url, forminstance, { crossdomain: true })
    .then(res => res.data);
};

function* postCreateReferralFormPostSaga(action) {
  try {
    //const { childInfo } = yield take(CREATE_REFERRAL_POST_POSTING);
    const { forminstance } = action;
    let forminstancePost = { forminstance };
    console.log("childInfo In Saga 1", forminstancePost);
    const createPostSuccessResponse = yield call(
      postCreateReferralFormData,
      forminstancePost
    );
    yield put({
      type: CREATE_REFERRAL_POST_POSTED,
      createPostSuccessResponse
    });
  } catch (error) {
    yield put({ type: CREATE_REFERRAL_POST_ERROR, error });
  }
  //yield put(push("/admin/referrals"));
}

export function* postCreateReferralSaga() {
  yield takeLatest(
    CREATE_REFERRAL_POST_POSTING,
    postCreateReferralFormPostSaga
  );
}
