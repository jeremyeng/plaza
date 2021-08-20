SecureHeaders::Configuration.default do |config|
  config.csp.script_src = %w('self' 'unsafe-inline')

  if Rails.env.development?
    config.csp.connect_src = %w('self' https http://localhost:3035 ws://localhost:3035)
  end
end
