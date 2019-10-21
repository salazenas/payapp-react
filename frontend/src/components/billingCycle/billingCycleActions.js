import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm } from "redux-form";
import { showTabs, selectTab } from "../../components/tab/tabActions";

const URL = "http://localhost:3003/api";

export const getList = () => {
  const { data } = axios.get(`${URL}/billingCycles`);

  return {
    type: "BILLING_CYCLES_FETCHED",
    payload: data
  };
};

export const create = bc => {
  return dispatch => {
    axios
      .post(`${URL}/billingCycles`, bc)
      .then(resp => {
        toastr.success("Sucesso", "Operação realizada com sucesso");
        dispatch([
          resetForm("billingCycleForm"),
          getList(),
          selectTab("tabList"),
          showTabs("tabList", "tabCreate")
        ]);
      })
      .catch(err => {
        err.response.data.errors.forEach(error => {
          toastr.error("Erro", error);
        });
      });
  };

  return {
    type: "NEW_BILLING_CYCLE",
    payload: bc
  };
};
