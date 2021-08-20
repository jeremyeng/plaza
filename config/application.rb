require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Plaza
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # This will cause the ActionDispatch::DebugExceptions middleware to
    # generate debug information in the requested content-type instead of as HTML only.
    # In turn, this allows graphti-rails to generate more specific error messages for JSON API requests.
    config.debug_exception_response_format = :api

    # Since Rails doesn't correctly format exceptions for JSON:API requests,
    # graphiti-rails intercepts these requests for proper rendering.
    # This enables GraphitiError handlers for other response types as well
    config.graphiti.handled_exception_formats += [:xml]

    config.generators do |g|
      g.test_framework :rspec
      g.helper false
      g.stylesheets false
    end

    config.action_mailer.delivery_method = :postmark

    config.action_mailer.postmark_settings = {
      api_token: Rails.application.credentials.postmark_api_token,
    }
  end
end
