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
    --update-env-vars MONGODB_URI="mongodb+srv://mongo:localhost123@edinburgh-finance-proje.hwx6tfh.mongodb.net/?retryWrites=true&w=majority&appName=edinburgh-finance-project",GOOGLE_CLIENT_ID="48728494160-nutuf32pt2s28nh7691vfss1a81iulfk.apps.googleusercontent.com",GOOGLE_CLIENT_SECRET="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,JWT_SECRET=FINANCE_TRACKER_SECRET"
```
