class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :handle, :last_name, :name, :role, :self_report

  def id
    object.non_sequential_id
  end

  def name
    "#{object.first_name} #{object.last_name} (#{object.handle})"
  end
end
