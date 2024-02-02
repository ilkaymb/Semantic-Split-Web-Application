# Gerekli modülleri içe aktar
from semantic_split import (
    SimilarSentenceSplitter,  # Benzer cümleleri gruplandırmak için kullanılacak
    SentenceTransformersSimilarity,  # Cümleler arası benzerliği hesaplamak için kullanılacak model
    SpacySentenceSplitter,  # Metni cümlelere ayırmak için kullanılacak araç
)

# İşlenecek olan metin
text = """
  I dogs are amazing.
  Cats must be the easiest pets around.
  Robots are advanced now with AI.
  Flying in space can only be done by Artificial intelligence.
  12.00 is my favorite time of the day."""

# Cümleler arası benzerliği hesaplamak için model oluştur
model = SentenceTransformersSimilarity()

# Metni cümlelere ayırmak için bir cümle bölücü oluştur
sentence_splitter = SpacySentenceSplitter()

# Benzer cümleleri gruplandırmak için SimilarSentenceSplitter nesnesi oluştur
# Bu nesne, yukarıda oluşturulan model ve cümle bölücüyü kullanır
splitter = SimilarSentenceSplitter(model, sentence_splitter)

# Metni işle ve benzer cümleleri gruplandır
res = splitter.split(text)

# Sonuçları yazdır
print(res)
