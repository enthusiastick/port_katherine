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
      print "Foob created." if user.save
    end
  end
end
