# frozen_string_literal: true
describe Mutations::Author::Update, type: :graphql do
  let(:context) { create_context }
  let!(:author) { create :author }

  describe '#call' do
    subject(:mutation) { described_class.new(object: nil, context: context) }

    it { is_expected.to be_of_type(Types::AuthorType) }
    it {
      is_expected.to accept_arguments(
        id: types.ID.to_non_null_type,
        data: Types::Input::AuthorInputType.to_non_null_type
      )
    }

    context 'when all required params exist' do
      let(:args) do
        {
          id: author.id,
          data: { username: 'captain_america' }
        }
      end

      it 'updates author with given username' do
        # pre-check
        expect(Author.all.first.username).to eq author.username

        # when
        mutation.resolve(args)

        # then
        expect(Author.all.first.username).to eq 'captain_america'
      end
    end

    context 'when id is missing' do
      let(:args) do
        {
          data: { username: 'captain_america' }
        }
      end

      it 'results in GraphQL error' do
        # when
        result = mutation.resolve(args)

        # then
        expect(result).to be_instance_of GraphQL::ExecutionError
      end

      it 'does not update author' do
        # pre-check
        expect(Author.first.username).to eq author.username

        # when
        mutation.resolve(args)

        # then
        expect(Author.first.username).not_to eq 'captain_america'
      end
    end
  end
end
