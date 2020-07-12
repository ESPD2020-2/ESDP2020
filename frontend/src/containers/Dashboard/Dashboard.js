import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";
import CountUp from "react-countup";
import Trend from "react-trend";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/Sort";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MenuItem from "@material-ui/core/MenuItem";
import { getOrdersByPeriod } from "../../store/actions/ordersActions";
import { timeUnit, scales, revenueStatus } from "../../constants";
import "../../bootstrap.min.css";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    width: 180,
    textAlign: "center",
    "& .MuiSelect-select": {
      "&:focus": {
        backgroundColor: "transparent",
      }
    }
  },
  titleWrap: {
    marginBottom: '1rem',
    padding: '24px 16px!important',
    background: '#fff',
    boxShadow: '0 0.46875rem 2.1875rem rgba(59,62,102,.03), 0 0.9375rem 1.40625rem rgba(59,62,102,.03), 0 0.25rem 0.53125rem rgba(59,62,102,.05), 0 0.125rem 0.1875rem rgba(59,62,102,.03)',
  },
  title: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem!important',
      fontWeight: 700
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem!important',
      fontWeight: 700
    }
  },
  chart: {
    '&:first-child div': {
      margin: 'auto'
    }
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [period, setPeriod] = useState("today");
  const [revenue, setRevenue] = useState('Ожидаемый доход');
  const totalOrders = useSelector((state) => state.ord.totalOrders);
  const deliveredOrders = useSelector((state) => state.ord.deliveredOrders);
  const canceledOrders = useSelector((state) => state.ord.canceledOrders);
  
  let totalAmount;
  let amountByPeriod;

  const chartOptions = {
    chart: {
      toolbar: {
        show: true,
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    grid: {
      strokeDashArray: "5",
      borderColor: "rgba(125, 138, 156, 0.3)",
    },
    stroke: {
      show: false,
      width: 1,
      colors: ["transparent"],
    },
    fill: {
      color: "#4191ff",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ["#4191ff", "#2b5876", "red"],
    legend: {show: true},
    labels: scales[period],
  };
  const chartData = [
    {
      name: "Заказов создано",
      data: totalOrders && totalOrders.statistics.ordersByPeriod,
    },
    {
      name: "Заказов доставлено",
      data: deliveredOrders && deliveredOrders.statistics.ordersByPeriod,
    },
    {
      name: "Заказов отменено",
      data: canceledOrders && canceledOrders.statistics.ordersByPeriod,
    },
  ];

  if (totalOrders && revenue === revenueStatus[0]) {
    totalAmount = totalOrders.totalAmount
    amountByPeriod = totalOrders.statistics.amountByPeriod
  } else if (deliveredOrders && revenue === revenueStatus[1]) {
    totalAmount = deliveredOrders.totalAmount
    amountByPeriod = deliveredOrders.statistics.amountByPeriod
  } else if (canceledOrders && revenue === revenueStatus[2]){
    totalAmount = canceledOrders.totalAmount;
    amountByPeriod = canceledOrders.statistics.amountByPeriod;
  }
  
  const showRevenueStatus = (action) => {
    const index = revenueStatus.findIndex(el => el === revenue);
    action === 'forward' 
    ? setRevenue(revenueStatus[index === revenueStatus.length-1 ? 0 : index +1])
    : setRevenue(revenueStatus[index === 0 ? revenueStatus.length-1 : index -1])
  }

  useEffect(() => {
    dispatch(getOrdersByPeriod(period));
    dispatch(getOrdersByPeriod(period, "delivered"));
    dispatch(getOrdersByPeriod(period, "canceled"));
  }, [dispatch, period]);

  return (
    <>
      {canceledOrders && deliveredOrders && totalOrders && (
        <Grid container spacing={4}>
           <Grid item xs className={classes.titleWrap}>
            <Typography className={classes.title} component="h1" variant="h4">Статистические данные по заказам</Typography>
          </Grid>
          <Grid item xs={11}>
            <TextField
              select
              className={classes.select}
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                ),
              }}
            >
              {timeUnit.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="card-box bg-green">
              <div className="card-header-alt px-2 pt-2 pb-0 d-flex align-items-start justify-content-between">
                <div>
                  <h3 className="font-weight-bold display-4 mb-0 text-black">
                    <CountUp
                      start={0}
                      end={totalOrders&&totalOrders.totalOrders}
                      duration={6}
                      deplay={2}
                      separator=""
                      decimals={0}
                      decimal=","
                    />
                  </h3>
                  <p className="font-size-lg text-black-50 mb-0">Создано</p>
                </div>
              </div>
              <div className="pr-5 pb-2">
                <Trend
                  data={totalOrders&&totalOrders.statistics.ordersByPeriod}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  height={120}
                  radius={15}
                  smooth
                  stroke="#007bff"
                  strokeLinecap="round"
                  strokeWidth={4}
                />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="card-box"
            style={{ backgroundImage: "linear-gradient(-20deg,#2b5876,#4e4376)" }}
            >
              <div className="card-header-alt px-2 pt-2 pb-0">
                <h3 className="font-weight-bold display-4 mb-0 text-white">
                  <CountUp
                    start={0}
                    end={deliveredOrders&&deliveredOrders.totalOrders}
                    duration={6}
                    deplay={2}
                    separator=" - "
                    decimals={0}
                    decimal=","
                  />
                </h3>
                <p className="font-size-lg text-white-50 mb-0">Доставлено</p>
              </div>
              <div className="pr-5 pb-2">
                <Trend
                  data={deliveredOrders&&deliveredOrders.statistics.ordersByPeriod}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  height={120}
                  radius={15}
                  smooth
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth={4}
                />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="card-box bg-danger">
              <div className="card-header-alt px-2 pt-2 pb-0">
                <h3 className="font-weight-bold display-4 mb-0 text-white">
                  <CountUp
                    start={0}
                    end={canceledOrders&&canceledOrders.totalOrders}
                    duration={6}
                    deplay={2}
                    separator=" - "
                    decimals={0}
                    decimal=","
                  />
                </h3>
                <p className="font-size-lg text-white-50 mb-0">Отменено</p>
              </div>
              <div className="pr-5 pb-2">
                <Trend
                  data={canceledOrders&&canceledOrders.statistics.ordersByPeriod}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  height={120}
                  radius={15}
                  smooth
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth={4}
                />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="card-box"
              style={{ backgroundImage: "linear-gradient(0deg,#1e3c72 0,#1e3c72 1%,#2a5298)" }}
            >
              <div className="card-header-alt px-2 pt-2 pb-0 d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="font-weight-bold display-4 mb-0 text-white">
                    <CountUp
                      start={0}
                      end={totalAmount}
                      duration={2}
                      deplay={2}
                      separator=""
                      decimals={0}
                      decimal=","
                    />
                  </h3>
                  
                </div>
                <div>
                  <IconButton onClick={()=> showRevenueStatus('back')}><NavigateBeforeIcon htmlColor='#fafafa'/></IconButton>
                  <IconButton onClick={()=> showRevenueStatus('forward')}><NavigateNextIcon htmlColor='#fafafa'/></IconButton>
                </div>
              </div>
              <p className="font-size-lg text-white-50 px-2 mb-0">{revenue}</p>
              <div className="pr-5 pb-2">
                <Trend
                  data={amountByPeriod}
                  autoDraw
                  autoDrawDuration={3000}
                  autoDrawEasing="ease-in"
                  height={120}
                  radius={15}
                  smooth
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth={4}
                />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="card-box">
              <Chart
                className={classes.chart}
                options={chartOptions}
                series={chartData}
                type="area"
                height={420}
                width={'97%'}
              />
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
