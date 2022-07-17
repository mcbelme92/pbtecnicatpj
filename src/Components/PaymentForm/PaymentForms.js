import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import CardCredit from "../Card";
import "./PaymentForms.scss";

const PaymentForms = () => {
  useEffect(() => {
    var cardNum = document.getElementById("card-credit-validate");
    cardNum.onkeyup = function (e) {
      if (this.value === this.lastValue) return;
      var caretPosition = this.selectionStart;
      var sanitizedValue = this.value.replace(/[^0-9]/gi, "");
      var parts = [];
      // eslint-disable-next-line no-redeclare
      for (var i = 0, len = sanitizedValue.length; i < len; i += 4) {
        parts.push(sanitizedValue.substring(i, i + 4));
      }
      // eslint-disable-next-line no-redeclare
      for (var i = caretPosition - 1; i >= 0; i--) {
        // eslint-disable-next-line no-redeclare
        var c = this.value[i];
        if (c < "0" || c > "9") {
          caretPosition--;
        }
      }
      caretPosition += Math.floor(caretPosition / 4);
      this.value = this.lastValue = parts.join(" ");
      this.selectionStart = this.selectionEnd = caretPosition;
    };
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formDAta) => {
      // console.log(formDAta)
      try {
        formik.resetForm();
        toast.success("PAGO EXITOSO!!");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const cancelPayment = () => {
    if (formik.values.number) {
      toast.warn("Pago cancelado");
      formik.resetForm();
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <label className="card-title-top">Current credit card</label>
        <CardCredit formik={formik} />
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name of card holder</label>
            <input
              title="Este campo solo puede contener letras SIN comas, puntos o caracteres especiales"
              pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$"
              placeholder="Howard Pinsky"
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name}
              maxLength="50"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="number">Credit card number</label>
            <input
              title="Faltan numeros"
              // pattern="{5}[0-9]+"
              placeholder="1234 3924 2394 3294"
              type="tel"
              id="card-credit-validate"
              name="number"
              value={formik.values.number}
              onChange={formik.handleChange}
              error={formik.errors.number}
              minLength="19"
              maxLength="19"
              className="form-control card-credit"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="expiry">Expiration</label>
              <input
                title="Solo numeros o te falta algun digito"
                pattern="[0-9]+"
                placeholder="0225"
                type="text"
                name="expiry"
                value={formik.values.expiry}
                onChange={formik.handleChange}
                error={formik.errors.expiry}
                maxLength="4"
                minLength="4"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="cvc">CVV</label>
              <input
                title="Solo numeros o te falta algun digito, es tu cvv de tu tarjeta"
                placeholder="231"
                pattern="[0-9]+"
                type="text"
                name="cvc"
                value={formik.values.cvc}
                onChange={formik.handleChange}
                error={formik.errors.cvc}
                maxLength="3"
                minLength="3"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="payment btn btn-light btn-block btn-lg payment"
              >
                Make Payment
              </button>
            </div>
            <div className="form-group col-md-6">
              <button
                onClick={cancelPayment}
                type="button"
                className="cancel btn btn-primary btn-block btn-lg "
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForms;

function initialValues() {
  return {
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string()
      .required("El nombre es obligatorio.")
      .max(50, "maximo 50 caracteres")
      .matches(/^[aA-zZ\s]+$/, "Solo letras"),
    number: Yup.number("Solo Numeros")
      .required("number is required!")
      .min(123457891234567, "Minimo 16 digitos"),
    expiry: Yup.number()
      .required("solo numeros")
      .min(1234, "Minimo 3digitos")
      .max(123456, "maximo 5 digitos"),
    cvc: Yup.number("solo numeros").required().min(123, "Minimo 3 digitos"),
  };
}
