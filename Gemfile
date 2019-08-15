# frozen_string_literal: true
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'batch-loader', '~> 1.4.1'
gem 'graphql', '~> 1.9.9'
gem 'httparty'
gem 'dotenv-rails'
gem 'rails', '~> 5.2.3'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'rubocop', '~> 0.42.0'
  gem 'rubocop-rspec', '~> 1.5.2'
end

group :test do
  gem 'factory_girl_rails'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 3.5.0'
  gem 'rspec', '~> 3.5.0'
  gem 'timecop'
  gem 'vcr', '~> 3.0.3'
  gem 'webmock', '~> 2.1.0'
end
