# frozen_string_literal: true
class Mutations::Rescuable < Base::Mutation
  def rescuable(&block)
    yield block
  rescue SafeError,
         ActiveRecord::RecordInvalid,
         ActiveRecord::RecordNotFound,
         StandardError => err

    err_klass = err.class
    object = err

    if err_klass == ActiveRecord::RecordInvalid
      object = err.record
    elsif err_klass <= Exception
      if Rails.env.development? || Rails.env.test?
        ActiveRecord::Base.logger.error(err.message)
        ActiveRecord::Base.logger.error(err.backtrace.join("\n "))
      end

      object = Api::ServerError.new(err.message, original: err)
    end

    errors = Api::Errors.from(object).to_json
    GraphQL::ExecutionError.new(errors)
  end
end
