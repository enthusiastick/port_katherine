class Api::V1::LodgingQuestionnairesController < Api::ApiController
  before_action :authenticate_user_api!

  def create
    questionnaire = LodgingQuestionnaire.new(lodging_questionnaire_params, current_user.id)
    questionnaire.record_answers!
    render json: questionnaire.response, status: questionnaire.status
  end

  protected

  def lodging_questionnaire_params
    params.require(:lodging_questionnaire).permit(:event_slug, :comments, :tenting, favored_users: [:label, :value], undesirable_users: [:label, :value])
  end
end
