namespace :skills do
  desc "Seed the rulebook skills."
  task seed: :environment do
    print "\nSeeding skills: "
      print "Vitality. " if HeaderSkill.find_or_create_by!(
        header: Header.open,
        skill: Skill.vitality,
        hidden: false
      )
    print "... Seeding complete."
  end
end
