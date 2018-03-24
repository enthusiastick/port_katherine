include ActiveSupport::Inflector

class Admin::Character::IndexSerializer < ActiveModel::Serializer
  attributes :available, :birthplace, :has_backstory, :id, :name,
    :first_true_header, :first_profession, :spent

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
end
