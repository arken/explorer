/*
 * This is what you will get at arken.io/explorer
 */

import React, { useState } from "react";
import {
  ButtonPrimary,
  ButtonDisabled,
  Input,
  LoaderCircles,
} from "slate-react-system";
import Base from "../components/Base";
import { Octokit } from "@octokit/rest";
import { Field, Form, Formik } from "formik";
import "../styles/explorer.scss";
import KeysetList from "../components/KeysetList";
import * as yup from "yup";

let lastSearch = 0;

type RepoFormState = {
  owner: string;
  repo: string;
};

export type KeysType = Array<any> | null;

const initFormState: RepoFormState = {
  owner: "",
  repo: "",
};

let lastFormState: RepoFormState = initFormState;
let hasSubmitted = false;
const formSchema = yup.object({
  owner: yup.string().min(1).required(),
  repo: yup.string().min(1).required(),
});

export const Explorer = () => {
  const [keys, setKeys] = useState<KeysType>([]);
  const [loading, setLoading] = useState(false);
  return (
    <Base pageName={"main"}>
      <div>
        <h1>Arken Explorer</h1>
        Enter the owner and name of a GitHub repository containing at least one
        Keyset (.ks) file
        <Formik
          initialValues={initFormState}
          validationSchema={formSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (lastFormState !== values) {
              hasSubmitted = true;
              setSubmitting(true);
              setLoading(true);
              onSubmit(values, setSubmitting, setLoading, setKeys);
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={"repo-form"}>
              <label htmlFor={"repo-owner"}>Repo owner</label> <br />
              <Field
                id={"repo-owner"}
                name={"owner"}
                validation={touched.owner && errors.owner && "ERROR"}
                as={Input}
              />
              <label htmlFor={"repo-name"}>Repo name</label>
              <Field
                id={"repo-name"}
                name={"repo"}
                validation={touched.repo && errors.repo && "ERROR"}
                as={Input}
              />
              {isSubmitting ? (
                <ButtonDisabled type={"label"}>Searching...</ButtonDisabled>
              ) : (
                <ButtonPrimary type={"submit"}>Submit</ButtonPrimary>
              )}
            </Form>
          )}
        </Formik>
        <div className={`keyset-list-container${loading ? " loading" : ""}`}>
          {loading ? (
            <LoaderCircles />
          ) : keys === null ? (
            "An error occurred, make sure you got the owner and repo names right."
          ) : (
            hasSubmitted && (
              <KeysetList keysets={keys} repoName={lastFormState.repo} />
            )
          )}
        </div>
      </div>
    </Base>
  );
};

const onSubmit = (
  values: RepoFormState,
  setSubmitting: (submitting: boolean) => void,
  setLoading: (loading: boolean) => void,
  setKeys: (keys: KeysType) => void
) => {
  const now = Date.now();
  const diff = now - lastSearch;
  const waitTime = diff <= 6000 && diff >= 0 ? diff : 0;
  //6000 because we get 10 requests per minute while unauthenticated
  setTimeout(() => {
    lastFormState = values;
    lastSearch = now.valueOf();
    new Octokit().search
      .code({ q: `extension:ks+repo:${values.owner}/${values.repo}` })
      .then((res) => {
        setKeys(res.data.items);
      })
      .catch(() => {
        setKeys(null);
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  }, waitTime);
};

export default Explorer;
