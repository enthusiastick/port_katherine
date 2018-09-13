namespace :users do
  desc "Seed a dummy user account with admin permissions."
  task admin: :environment do
    if Rails.env.production?
      puts "Error! This rake task is not intended to be run in the production environment."
    else
      user = User.new(
        confirmed_at: Time.now,
        email: "foob@example.com",
        first_name: "Foo",
        handle: "foob",
        last_name: "Bar",
        password: "password",
        role: :admin
      )
      print "\nFoob created." if user.save
    end
  end
  desc "Set password for all users to 'password'."
  task endanger: :environment do
    if !Rails.env.development?
      puts "Error! This rake task is not intended to be run in the #{Rails.env} environment."
    else
      User.all.each { |user| print "#{user.label}. " if user.update(password: "password") }
    end
  end
end
