# frozen_string_literal: true
describe Mutations::Author::Create, type: :graphql do
  let(:context) { create_context }

  describe '#call' do
    subject(:mutation) { described_class.new(object: nil, context: context) }

    it { is_expected.to be_of_type(Types::AuthorType) }
    it { is_expected.to accept_arguments(data: Types::Input::AuthorInputType.to_non_null_type) }

    context 'when all required params exist' do
      let(:args) do
        {
          data: {
            username: 'captain_america',
            first_name: 'Steve',
            last_name: 'Rogers'
          }
        }
      end

      it 'creates author with given username' do
        # pre-check
        expect(Author.count).to eq 0

        # when
        author = mutation.resolve(args)

        # then
        expect(Author.count).to eq 1
        expect(author.username).to eq 'captain_america'
      end
    end

    context 'when username is missing' do
      let(:args) do
        {
          data: {
            first_name: 'Steve',
            last_name: 'Rogers'
          }
        }
      end

      it 'does not create author' do
        # pre-check
        expect(Author.count).to eq 0

        # when
        mutation.resolve(args)

        # then
        expect(Author.count).to eq 0
      end
    end
  end
end
