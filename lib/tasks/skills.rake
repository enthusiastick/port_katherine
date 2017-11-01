require "csv"

namespace :skills do
  desc "Seed the rulebook skills."
  task seed: :environment do
    print "\n---=== Begin Seeding Skills ===---\n"
      print "Vitality. " if HeaderSkill.find_or_create_by!(
        header: Header.open,
        skill: Skill.vitality,
        hidden: false
      )

      Header.stock.each do |header|
        print "\n#{header.name}: "
        filepath = Rails.root.join("db/data/skills/#{header.name.downcase}.csv")
        CSV.foreach(filepath, headers:true) do |row|
          skill = Skill.find_or_initialize_by(name: row["Skill Name"].titleize)
          unless skill.persisted?
            description = row["Description"]
            description = description.gsub(/(``|'')/, "\"")
            description = description.gsub(/\(see \\hyperref\[\w*:\w*\]\{\w*\}\)\s/, "")
            description = description.gsub(/---/, " – ")
            skill.description = description
            skill.starting_cost = row["Skill Cost"]
            skill.max_rank = 1 if row["Starred?"] == "y"
            skill.save
          end
          header_skill = HeaderSkill.new(
            header: header,
            hidden: false,
            skill: skill
          )
          header_skill.true_skill = true if row["Tier/Path"] == "true skills"
          print "#{skill.name}. " if header_skill.save
        end
        print "... complete."
      end
    print "\n---=== Seeding Skills Complete ===---"
  end
end
