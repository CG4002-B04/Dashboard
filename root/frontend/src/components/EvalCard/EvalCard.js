import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: 240,
    height: 350, 
    maxWidth: 250,
    margin: 'auto', //set it to auto do it doesn't cut off the title
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  media: {
    borderRadius: 6,
    height: 200,
    width: 200,
  },
});

export default function EvalCard({dancerName, position, danceMove}) {
  const classes = useStyles();
  console.log(dancerName);
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={require('../../static/' + dancerName + '.jpg')}
        />
        <CardContent>
          <Typography variant="subtitle1" component="h2">
            DANCER {position}
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            {dancerName}
          </Typography>
          <Typography variant="h5" component="h5">
            {danceMove}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}