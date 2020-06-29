import React from "react";
import CountUp from "react-countup";
import Trend from "react-trend";
import { Grid, Card, Button } from "@material-ui/core"; 
// Box, IconButton, 
// import FontAwesomeIcon from "@material-ui/core/Icon";

const Dashboard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <Card className="card-box mb-4 bg-green">
          <div className="card-header-alt px-4 pt-4 pb-0 d-flex align-items-start justify-content-between">
            <div>
              <h3 className="font-weight-bold display-4 mb-0 text-black">
                <CountUp
                  start={0}
                  end={895}
                  duration={6}
                  deplay={2}
                  separator=""
                  decimals={0}
                  decimal=","
                />
              </h3>
              <p className="font-size-lg text-black-50 mb-0">Выполненных заказов</p>
            </div>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className="text-uppercase font-size-xs"
            >
              Details
            </Button>
          </div>
          <div className="pr-5 pb-3">
            <Trend
              data={[5, 10, 5, 13, 5.6, 8, 5, 5.6, 11, 10,9,6,5,3,4,8,12,5,5.5,6,9,7,8,1,2,3,4,5,6,7,8,9]}
              autoDraw
              autoDrawDuration={3000}
              autoDrawEasing="ease-in"
              height={120}
              radius={15}
              smooth
              stroke="var(--primary)"
              strokeLinecap="round"
              strokeWidth={4}
            />
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className="card-box mb-4" style={{background: 'linear-gradient(-20deg,#2b5876,#4e4376)'}}>
          <div className="card-header-alt px-4 pt-4 pb-0">
            <h3 className="font-weight-bold display-4 mb-0 text-white">
              <CountUp
                start={0}
                end={586}
                duration={6}
                deplay={2}
                separator=""
                decimals={0}
                decimal=","
              />
            </h3>
            <p className="font-size-lg text-white-50 mb-0">Общий доход</p>
          </div>
          <div className="pr-5 pb-3">
            <Trend
              data={[6, 8, 5, 5, 5.6, 13, 5.6, 12, 10]}
              autoDraw
              autoDrawDuration={3000}
              autoDrawEasing="ease-in"
              height={120}
              radius={15}
              smooth
              stroke="var(--white)"
              strokeLinecap="round"
              strokeWidth={4}
            />
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className="card-box bg-danger mb-4">
          <div className="card-header-alt px-4 pt-4 pb-0">
            <h3 className="font-weight-bold display-4 mb-0 text-white">
              <CountUp
                start={0}
                end={183.954}
                duration={6}
                deplay={2}
                separator=""
                decimals={3}
                decimal=","
              />
            </h3>
            <p className="font-size-lg text-white-50 mb-0">Total Deliveries</p>
          </div>
          <div className="pr-5 pb-3">
            <Trend
              data={[5, 8, 5.6, 13, 5.6, 8, 6, 12, 10]}
              autoDraw
              autoDrawDuration={3000}
              autoDrawEasing="ease-in"
              height={120}
              radius={15}
              smooth
              stroke="var(--white)"
              strokeLinecap="round"
              strokeWidth={4}
            />
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
