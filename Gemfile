source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "active_model_serializers", "~> 0.10.0"
gem "bcrypt", "~> 3.1.7"
gem "braintree", "~> 2.47"
gem "coffee-rails", "~> 4.2"
gem "font-awesome-rails"
gem "foundation-rails"
gem "haml"
gem "httparty"
gem "jbuilder", "~> 2.5"
gem "jquery-rails"
gem "pg", "~> 1.3"
gem "puma", "~> 4.3"
gem "rails", "~> 5.2.8"
gem "redcarpet"
gem "rodauth-rails", "~> 1.0"
gem "sass-rails", "~> 5.0"
gem "sitemap_generator"
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
  gem "rails_real_favicon"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

ruby "2.7.6"
