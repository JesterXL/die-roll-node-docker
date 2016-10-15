docker build -t dice .
heroku container:push web
heroku open
