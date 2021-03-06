require "csv"

namespace :skills do
  desc "Seed the rulebook skills."
  task seed: :environment do
    print "\n---=== Begin Seeding Skills ===---\n"
      print "Open: "
      CSV.foreach(Rails.root.join("db/data/skills/open.csv"), headers: true) do |row|
        skill = Skill.find_or_initialize_by(name: row['Name'])
        unless skill.persisted?
          skill.starting_cost = row['Cost']
          skill.max_rank = row['Max']
          skill.save
          print "#{row['Name']}. " if HeaderSkill.find_or_create_by!(
            header: Header.open,
            skill: skill,
            hidden: false
          )
        end
      end
      print "... complete."

      Header.stock.each do |header|
        print "\n#{header.name}: "
        filepath = Rails.root.join("db/data/skills/#{header.name.downcase}.csv")
        CSV.foreach(filepath, headers: true) do |row|
          skill = Skill.find_or_initialize_by(name: row["Skill Name"].titleize)
          unless skill.persisted?
            description = row["Description"]
            description = description.gsub(/(``|'')/, "\"")
            description = description.gsub(/\(see \\hyperref\[\w*:\w*\]\{\w*\}\)\s/, "")
            description = description.gsub(/---/, " – ")
            skill.description = description
            skill.starting_cost = row["Skill Cost"]
            skill.max_rank = 1 if row["starred?"] == "y"
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

      print "\nProfession: "
      CSV.foreach(Rails.root.join("db/data/skills/professions.csv"), headers: true) do |row|
        skill = Skill.find_or_initialize_by(name: row['Name'])
        unless skill.persisted?
          skill.starting_cost = row['Cost']
          skill.max_rank = row['Max']
          header = Header.find_by(name: row['Profession'])
          hidden = row['Hidden'] == 'TRUE' ? true : false
          print "#{row['Name']}. " if skill.save &&
          HeaderSkill.find_or_create_by!(
            header: header,
            skill: skill,
            hidden: hidden
          )
          header.update(linked_first_skill: skill) if (row['Auto'] == '1' || row['Refund'] != '0')
        end
      end
      print "... complete."
    print "\n---=== Seeding Skills Complete ===---"
  end
end
