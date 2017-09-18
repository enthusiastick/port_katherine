source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "bcrypt", "~> 3.1.7"
gem "coffee-rails", "~> 4.2"
gem "font-awesome-rails"
gem "foundation-rails"
gem "haml"
gem "jbuilder", "~> 2.5"
gem "jquery-rails"
gem "pg", "~> 0.18"
gem "puma", "~> 3.7"
gem "rails", "~> 5.1.4"
gem "sass-rails", "~> 5.0"
gem "uglifier", ">= 1.3.0"
gem "webpacker"

group :development, :test do
  gem "dotenv-rails"
  gem "pry-rails"
  # gem "rails_real_favicon"
  gem "rspec-rails"
end

group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

ruby "2.4.1"
