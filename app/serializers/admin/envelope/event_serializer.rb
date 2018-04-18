class Admin::Envelope::EventSerializer < ActiveModel::Serializer
  attributes :name, :slug

  has_many :characters do
    object.characters.alpha_by_name
      .select { |character| character.has_envelope_skills? }
  end

  class CharacterSerializer < ActiveModel::Serializer
    attributes :id, :name, :skills, :user_handle, :user_name

    def id
      object.non_sequential_id
    end

    def skills
      skills = Hash.new
      object.character_skills.where(skill: Skill.envelope)
        .map {
          |character_skill| skills[character_skill.name] =character_skill.ranks
        }

      skills[Header.military_officer.name] = 1 if object.headers.include?(Header.military_officer)
      skills
    end

    def user_handle
      object.user.handle
    end

    def user_name
      object.user.label
    end
  end
end
