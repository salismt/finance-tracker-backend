### How to run this locally
1. Make sure you have mongodb installed and running, you can check via mongosh
```
mongo
>
```
2. make sure port `3000` is available
3. run the app `npm run start`

### How to deploy

Commit the changes
```
git add -- .
git commit -m "commit"
```

Then build the image
```
gcloud builds submit --tag gcr.io/edinburgh-finance-tracker/finance-tracker-backend .
```

Run the deployment
```
gcloud run deploy finance-tracker-backend \
    --image gcr.io/edinburgh-finance-tracker/finance-tracker-backend \
    --platform managed \
    --allow-unauthenticated \
    --update-env-vars MONGODB_URI="mongodb+srv://mongo:localhost123@edinburgh-finance-proje.hwx6tfh.mongodb.net/test?retryWrites=true&w=majority&appName=edinburgh-finance-project",GOOGLE_CLIENT_ID="48728494160-nutuf32pt2s28nh7691vfss1a81iulfk.apps.googleusercontent.com",GOOGLE_CLIENT_SECRET="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,JWT_SECRET=FINANCE_TRACKER_SECRET"
```

Then select asia-southeast1 when the prompt comes
