namespace :skills do
  desc "Seed the rulebook skills."
  task seed: :environment do
    print "\nSeeding skills: "
      Skill.vitality

    print "... Seeding complete."
  end
end
