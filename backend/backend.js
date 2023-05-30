const app = require('./app')
const Razorpay = require('razorpay')
var SpotifyWebApi = require('spotify-web-api-node');

const fs = require('fs')
 const instance = new Razorpay({
    key_id:"rzp_test_4evzawVt5Ct89r",
    key_secret:"dhC5xWo8VLwAUOpVaZ1EAiwh",
  });





  const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];
  
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '7a9dc31824da47f78b6a7635cb8d7db4',
    clientSecret: '17546b9d682d471684b1dfc2b84c033f',
    redirectUri: 'http://localhost:9000/callback'
  });
  

  app.get('/login', (req, res) => {
    res.json(spotifyApi.createAuthorizeURL(scopes));

  });
  


  app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
    var storingAccess = []
  var access_token;
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
  
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  

        storingAccess.push({
          access_token : access_token,
          refresh_token : refresh_token
        })


        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now close the window.');
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);


        // res.json(storingAccess)
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
  });








  const token = "BQARvkLrSgUJstcbyExNuWT1hHsb3j3mlRetPQfJJbU7X7aEcDw_dOOtrXTceI4bQxicbeOpTEqbgUZBjzBZEwGalA3lCvQNrPHRDhIDHGPoUfZyIbTz6pVP4eIzWJU4GDlRe3DYpr8guWpxHPMA2L7LlhX5JkqpscTiYFEnFtC-MSjWDT77cqM4zDtgQfbJmM-EkyAHYIy2wznWC7qOEZCOowGtGYSfDPQ9s0UNyNiUZiV0PpA4HrFSwBnO--IJb65Jnlp1J0BOK6J9tHcofgX4hzFxo-xk6OY_Hgb3u8CPsHr5sBblOp_1Vhe3WoAqn5RqtWIqjr1yvlGsmHkt"

  const spotifyApi1 = new SpotifyWebApi();
  spotifyApi1.setAccessToken(token);




  
app.post('/searched',async (req,res)=>{

const {search} =  req.body;
console.log(search)

   await spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      spotifyApi.setAccessToken(token);
  
      
      return  spotifyApi.searchTracks(search, { limit: 10 }); 
    })
    .then((data) => {
      const tracks = data.body.tracks.items;
  
      console.log('Search Results:');

      const dataSpot = [];

      tracks.forEach((track, index) => {
        const trackName = track.name;
        const artistNames = track.artists.map((artist) => artist.name).join(', ');
        console.log(`${index + 1}. ${trackName} - ${artistNames}  -  ${track.external_urls.spotify}`  );
        
        dataSpot.push({
          index : index + 1,
          trackName,
          artistNames,
          spotifyUrl: track.external_urls.spotify

        })
    
      });
     
      res.json({"Mydata" : dataSpot})

    })
    .catch((error) => {
      console.error('Error:', error);
    });


 
  })


  













  app.post('/plan',(req,res)=>{
    const planData = {
      period: "weekly",
      interval: 1,
      item: {
        name: "Test plan - Weekly",
        amount: 5000,
        currency: "INR",
        description: "Description for the test plan"
      },
      notes: {
        notes_key_1: "Tea, Earl Grey, Hot",
        notes_key_2: "Tea, Earl Grey… decaf."
      }
    };
  
    instance.plans.create(planData, function(err, plan) {
      if (err) {
        console.error('Error creating plan:', err);
        // Handle the error appropriately
        res.status(500).json({ error: 'Failed to create plan' });
      } else {
        console.log('Plan created:', plan);
        // Handle the created plan object
        res.status(201).json(plan);
      }
    });
  



  })




// create a sub
  app.post('/create_sub', (req, res) => {
    const subscriptionData = {
      plan_id: "plan_LvmegVCdKyFvNM",
      customer_notify: 1,
      quantity: 1,
      total_count: 6,
      // start_at: Math.floor(Date.now() / 1000),
      addons: [
        {
          item: {
            name: "Salary Deduction",
            amount: 25000,
            currency: "INR"
          }
        }
      ],
      notes: {
        key1: "value3",
        key2: "value2"
      }
    };
  
    instance.subscriptions.create(subscriptionData, function(err, subscription) {
      if (err) {
        console.error('Error creating subscription:', err);

        res.status(500).json({ error: 'Failed to create subscription' });
      } else {
        console.log('Subscription created:', subscription);

        res.status(201).json(subscription);
      }
    });
  });
















// cancel a sub


app.post('/sub/:id/cancel', async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const cancelOptions = {   cancel_at_cycle_end: "true",}; // Add any cancellation options if required

    const canceledSubscription = await instance.subscriptions.cancel(subscriptionId, false);
    console.log('Subscription canceled:', canceledSubscription);
    // Handle the canceled subscription object
    res.status(200).json(canceledSubscription);
  } catch (err) {
    console.error('Error canceling subscription:', err);
    // Handle the error appropriately
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

















// pause a subscription

app.post('/sub/:id/pause', async (req, res) => {
  try {
    const subscriptionId = req.params.id;

    const canceledSubscription = await instance.subscriptions.pause(subscriptionId,{
      pause_at : 'now'
    });
    console.log('Subscription pause:', canceledSubscription);
    // Handle the canceled subscription object
    res.status(200).json(canceledSubscription);
  } catch (err) {
    console.error('Error pause subscription:', err);
    // Handle the error appropriately
    res.status(500).json({ error: 'Failed to pause subscription' });
  }
});










// Resume a subscription

app.post('/sub/:id/resume', async (req, res) => {
  try {
    const subscriptionId = req.params.id;

    const canceledSubscription = await instance.subscriptions.resume(subscriptionId,{
      resume_at : 'now'
    })
    console.log('Subscription pause:', canceledSubscription);
    // Handle the canceled subscription object
    res.status(200).json(canceledSubscription);
  } catch (err) {
    console.error('Error pause subscription:', err);
    // Handle the error appropriately
    res.status(500).json({ error: 'Failed to pause subscription' });
  }
});




app.listen(9000,()=>{
    console.log(`server is running at 9000`)
})




module.exports = instance
