# Port Katherine

*[Port Katherine](https://www.portkatherine.com)* is a LARP (Live Action Role-Play) administration web app using **Ruby on Rails** and **React.js** (via `webpacker` and `yarn`.) User authentication is gated behind Google's reCAPTCHA (for which you'll need keys, as referenced in the .env.example file.) To get it up and running locally:

```bash
$ git clone git@github.com:enthusiastick/port_katherine.git
$ bundle install
$ rake db:create
$ rake db:migrate
$ rails server
```

And then, in a separate terminal tab:

```bash
$ yarn install
$ yarn start
```

## Database Snapshot

To capture and download a snapshot of the production database, run the following commands:

```bash
$ heroku pg:backups capture
$ curl -o latest.dump `heroku pg:backups:public-url`
```

To restore the snapshot to your local database, run the following command:

```bash
$ pg_restore --verbose --clean --no-acl --no-owner -d port_katherine_development latest.dump
```

