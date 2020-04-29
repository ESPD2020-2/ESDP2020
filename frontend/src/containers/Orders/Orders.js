import React, { Component } from "react";
import { connect } from "react-redux";
import OrderRow from "../../components/OrderRow/OrderRow";
import {
  removeOrder,
  transferToCourier,
} from "../../store/actions/ordersActions";
import { initialState } from "../../constants";
import "./Orders.css";

class Orders extends Component {
  state = initialState;

  // componentDidMount() {
  //   if (this.props.user) {
  //     this.websocket = new ReconnectingWebSocket(`ws://localhost:8000/orders?Token=${this.props.user.token}`);

  //     this.websocket.onmessage = (message) => {
  //       try {
  //         const data = JSON.parse(message.data);

  //         switch (data.type) {
  //           case 'NEW_ORDER':
  //             this.setState({orders: [...this.state.orders, data._doc]})
  //             break;
  //           case 'LAST_ORDERS':
  //             this.setState({orders: data.orders});
  //             break;
  //           // case 'CONNECTED_USERS':
  //           //   this.setState({connectedUsers: data.users});
  //           //   break;
  //           // case 'AUTHENTICATION_ERROR':
  //           //   this.setState({error: data.error, show: !this.state.show});
  //           //   break;
  //           default:
  //             console.log('default')
  //         }

  //         // this.scrollToBottom()

  //       } catch (e) {
  //         console.log('Something went wrong', e);
  //       }
  //     }
  //   };
  // };

  // sendMessage = (message) => {
  //   this.websocket.send(JSON.stringify(message));
  //   this.setState({open: false});
  // };

  // scrollToBottom = () => {
  //   this.el.scrollIntoView({ block: "end", behavior: "smooth" });
  // };

  selectCourierHandler = (e, id) => {
    const orders = [...this.state.orders];
    const index = orders.findIndex((el) => el._id === id);
    let order = orders[index];
    order.courier = e.target.value;
    orders[index] = order;
    this.setState({ orders });
  };

  transferToCourierHandler = (id) => {
    const data = {
      courier: id,
      status: "distributed",
    };
    this.props.transferToCourier(data);
  };

  render = () => {
    return (
      <div className="container">
        <h2>Список заказов</h2>
        <table className="orders">
          <thead>
            <tr>
              <th>№ заказа</th>
              <th>Создан</th>
              <th>Заказчик</th>
              <th>тел. заказчика</th>
              <th>Сумма</th>
              <th>Курьер</th>
              <th>Передать курьеру</th>
              <th>Удалить заказ</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(
              (ord) =>
                ord.status === "notDistributed" && (
                  <OrderRow
                    key={ord._id}
                    id={ord._id}
                    ordNum={ord.orderNumber}
                    createdAt={ord.createdAt}
                    customerName={
                      ord.customer
                        ? ord.customer.displayName
                        : ord.pickupEntityName
                    }
                    customerPhone={
                      ord.customer ? ord.customer.phone : ord.phoneNumber
                    }
                    couriers={this.state.couriers}
                    selectedCourier={ord.courier}
                    pickupTime={ord.pickupTime}
                    amount={ord.paymentAmount}
                    status={ord.isDelivered}
                    removeOrder={() => this.props.removeOrder(ord.courier)}
                    transferToCourier={() =>
                      this.transferToCourierHandler(ord.courier)
                    }
                    selectCourier={(e) => this.selectCourierHandler(e, ord._id)}
                  />
                )
            )}
          </tbody>
        </table>
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  removeOrder: (orderId) => dispatch(removeOrder(orderId)),
  transferToCourier: (data) => dispatch(transferToCourier(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
