class ReCaptchaChecker
  def initialize(re_captcha_string)
    @re_captcha_string = re_captcha_string
    @verification = HTTParty.post(google_api_url, options)
  end

  def google_api_url
    "https://www.google.com/recaptcha/api/siteverify"
  end

  def options
    {
      body: {
        secret: ENV["RECAPTCHA_PRIVATE_KEY"],
        response: @re_captcha_string
      }
    }
  end

  def verified?
    @verification.parsed_response["success"]
  end
end
