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
