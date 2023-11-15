from sentence_transformers import SentenceTransformer
import pinecone

pinecone.init(api_key="2b71f377-895a-4720-ad18-1fac4024c5ec", environment="gcp-starter")

index = pinecone.Index('youtube-search')

retriever = SentenceTransformer('flax-sentence-embeddings/all_datasets_v3_mpnet-base')

query = "What is deep learning?"

xq = retriever.encode([query]).tolist()

xc = index.query(xq, top_k=3,
                 include_metadata=True)

for context in xc['matches']:
    print(context['metadata']['text'], end="\n---\n")




