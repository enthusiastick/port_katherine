class Header < ApplicationRecord
  PUBLIC = [:stock, :profession]

  belongs_to :parent_header, class_name: :Header, optional: true
  belongs_to :linked_first_skill_id, class_name: :Skill, optional: true

  enum category: {
    stock: 0,
    profession: 1,
    hidden: 2,
    advanced: 3
  }

  enum season: {
    not_applicable: 0,
    spring: 1,
    summer: 2,
    autumn: 3,
    winter: 4
  }

  has_many :character_headers
  has_many :characters, through: :character_headers
  has_many :header_skills
  has_many :skills, through: :header_skills

  validates_uniqueness_of :name

  def self.open
    find_or_create_by(name: "Open")
  end
end