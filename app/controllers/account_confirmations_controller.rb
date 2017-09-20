class AccountConfirmationsController < ApplicationController
  def edit
    user = User.find_by(email: params[:email])
    unless (user.present? && user.authenticated?(:confirmation, params[:id]))
      redirect_to root_url
    end
  end
end
