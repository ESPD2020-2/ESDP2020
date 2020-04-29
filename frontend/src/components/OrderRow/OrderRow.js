import React from "react";
import { NavLink } from "react-router-dom";

const OrderRow = (props) => {
  return (
    <tr>
      <td>
        <NavLink to={`/orders/${props.id}`}>{props.ordNum}</NavLink>
      </td>
      <td>{props.createdAt}</td>
      <td>{props.customerName}</td>
      <td>{props.customerPhone}</td>
      <td>{props.amount}</td>
      <td>
        <select onChange={props.selectCourier} className="form-control">
          <option value={null}>Выберите курьера</option>
          {props.couriers.map((el) => (
            <option key={el._id} value={el._id}>
              {el.displayName}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          disabled={!props.selectedCourier}
          onClick={props.transferToCourier}
        >
          Передать
        </button>
      </td>
      <td>
        <button onClick={props.removeOrder}>Удалить</button>
      </td>
    </tr>
  );
};

export default OrderRow;
