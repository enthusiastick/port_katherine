class DiscourseSsoController < ApplicationController
  before_action :authenticate_user!

  def sso
    secret = ENV["DISCOURSE_SSO_SECRET"]
    sso = SingleSignOn.parse(request.query_string, secret)
    sso.email = current_user.email
    sso.name = current_user.full_name
    sso.username = current_user.handle
    sso.external_id = current_user.id
    sso.title = current_user.default_character.name if current_user.default_character.present?
    sso.sso_secret = secret

    redirect_to sso.to_url("#{ENV['FORUMS_URL']}/session/sso_login")
  end
end
