if Rails.env.production?
  Rails.application.config.action_mailer.default_url_options = { host: ENV["HOST_DOMAIN"] }
  Rails.application.config.action_mailer.delivery_method = :smtp
  Rails.application.config.action_mailer.smtp_settings = {
    address:              "smtp.mailgun.org",
    port:                 587,
    domain:               ENV["MAILGUN_SMTP_LOGIN"],
    user_name:            ENV["MAILGUN_SMTP_LOGIN"],
    password:             ENV["MAILGUN_SMTP_PASSWORD"],
    authentication:       "plain" }
else
  Rails.application.config.action_mailer.default_url_options = { host: "localhost:3000" }
end
