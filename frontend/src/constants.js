export const apiURL = "http://localhost:8000";

export const initialState = {
  orders: [
    {
      _id: "sdd3r23",
      orderNumber: 1,
      createdAt: "15 апреля",
      customer: {
        _id: "sdgsdgsdgsdg",
        displayName: "Vasya",
        phone: "+996555897452",
      },
      courier: null,
      pickupTime: "25 апреля",
      paymentAmount: "500",
      status: 'notDistributed',
      isDelivered: false,
    },
    {
      _id: "sdd3sdg32r231",
      orderNumber: 2,
      createdAt: "15 апреля",
      customer: {
        _id: "sdgsdgsdgsdg",
        displayName: "Oleg",
        phone: "+996555897452",
      },
      courier: null,
      pickupTime: "25 апреля",
      paymentAmount: "500",
      status: 'notDistributed',
      isDelivered: false,
    },
    {
      _id: "sdd3sdg32r232",
      orderNumber: 3,
      createdAt: "15 апреля",
      customer: {
        _id: "sdgsdgsdgsdg",
        displayName: "Oleg",
        phone: "+996555897452",
      },
      courier: null,
      pickupTime: "25 апреля",
      paymentAmount: "500",
      status: 'notDistributed',
      isDelivered: false,
    },
    {
      _id: "sdd3sdg32r233",
      orderNumber: 4,
      createdAt: "15 апреля",
      customer: {
        _id: "sdgsdgsdgsdg",
        displayName: "Oleg",
        phone: "+996555897452",
      },
      courier: null,
      pickupTime: "25 апреля",
      paymentAmount: "500",
      status: 'notDistributed',
      isDelivered: false,
    },
  ],
  couriers: [
    {
      _id: "524534",
      displayName: "Vasya",
    },
    {
      _id: "gjsdgs",
      displayName: "Petya",
    },
    {
      _id: "gjssfg2dgs",
      displayName: "John",
    },
  ],
};
