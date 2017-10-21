namespace :headers do
  desc "Seed the rulebook headers and professions."
  task seed: :environment do
    print "\nSeeding headers: "
    print "Open. " if Header.find_or_create_by!(
      name: "Open",
      category: :stock
    )
    {
      spring: %w(Apothecary Surgeon),
      summer: %w(Soldier Engineer),
      autumn: %w(Skirmisher Spiritualist),
      winter: %w(Artificer Scholar)
    }.each do |season, headers|
      headers.each do |header|
        print "#{header}. " if Header.find_or_create_by!(
          name: header,
          category: :stock,
          season: season
        )
      end
    end
    print "... Seeding complete."

    print "\nSeeding professions: "
    ["Beekeeper", "Cook", "Criminal", "Day Laborer", "Farmer", "Gardener",
      "Hunter", "Laborer", "Landowner", "Merchant", "Military Officer",
      "Socialite", "Stockbroker"].each do |profession|
      print "#{profession}. " if Header.find_or_create_by!(
        name: profession,
        category: :profession
      )
    end
    print "... Seeding complete."
  end
end
