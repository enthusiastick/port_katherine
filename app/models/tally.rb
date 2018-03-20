class Tally < ApplicationRecord
  belongs_to :character, optional: true
  belongs_to :recipient, class_name: :User, optional: true
  belongs_to :user

  validates_presence_of :description

  def summary
    "#{user.handle} #{description}"
  end

  def update_annotation_for_character(character)
    update(annotation: "[#{character.available}+#{character.user.available}]")
  end
end
