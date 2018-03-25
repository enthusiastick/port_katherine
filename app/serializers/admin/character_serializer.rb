include ActiveSupport::Inflector

class Admin::CharacterSerializer < ActiveModel::Serializer
  attributes :available, :birthplace, :has_backstory, :id, :name,
    :first_true_header, :first_profession, :spent, :user_handle

  def id
    object.non_sequential_id
  end

  def birthplace
    titleize(object.birthplace)
  end

  def has_backstory
    !object.backstories.empty?
  end

  def first_true_header
    object.first_true_header.name
  end

  def first_profession
    object.first_profession.name
  end

  def user_handle
    object.user.handle
  end
end
