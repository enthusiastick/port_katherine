class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :handle, :last_name, :name, :role,
    :received_cycle, :self_report, :new_player_discounted_at

  def id
    object.non_sequential_id
  end

  def name
    object.label
  end
end
