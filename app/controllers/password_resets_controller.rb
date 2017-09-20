class PasswordResetsController < ApplicationController
  def edit
    user = User.find_by(email: params[:email])
    unless (user.present? && user.confirmed? && user.authenticated?(:password_reset, params[:id]))
      redirect_to root_url
    end
  end
end
