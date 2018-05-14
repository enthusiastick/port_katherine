class Api::ApiController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def authenticate_admin_api!
    unless user_signed_in? && current_user.admin?
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def authenticate_plot_staff_api!
    unless user_signed_in? && current_user.plot_staff?
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def authenticate_user_api!
    if !user_signed_in?
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def authorize_record_owner(object)
    object.user == current_user
  end

  def authorize_record_owner_or_admin?(object)
    current_user.admin? ||
    object.user == current_user
  end

  def authorize_record_owner_or_plot_staff?(object)
    current_user.plot_staff? ||
    object.user == current_user
  end

  def render_object_errors(object)
    render json: { error: object.errors }, status: :unprocessable_entity
  end
end
