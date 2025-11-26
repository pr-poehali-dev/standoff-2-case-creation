import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SKINS = [
  { id: 1, name: 'Quantum AK-47', rarity: 'legendary', chance: 0.5, color: '#D946EF', image: '🔮' },
  { id: 2, name: 'Cyber AWP', rarity: 'legendary', chance: 0.5, color: '#8B5CF6', image: '⚡' },
  { id: 3, name: 'Neon M4A4', rarity: 'epic', chance: 2, color: '#0EA5E9', image: '💎' },
  { id: 4, name: 'Holo Deagle', rarity: 'epic', chance: 2, color: '#06B6D4', image: '🌟' },
  { id: 5, name: 'Plasma Knife', rarity: 'rare', chance: 5, color: '#8B5CF6', image: '⚔️' },
  { id: 6, name: 'Fusion USP', rarity: 'rare', chance: 5, color: '#3B82F6', image: '🔥' },
  { id: 7, name: 'Digital Glock', rarity: 'uncommon', chance: 15, color: '#6366F1', image: '🎯' },
  { id: 8, name: 'Tech MP5', rarity: 'uncommon', chance: 15, color: '#6366F1', image: '🎮' },
  { id: 9, name: 'Basic Skin 1', rarity: 'common', chance: 27.5, color: '#64748B', image: '🎲' },
  { id: 10, name: 'Basic Skin 2', rarity: 'common', chance: 27.5, color: '#64748B', image: '🎪' },
];

const RARITY_INFO = {
  legendary: { label: 'Легендарный', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
  epic: { label: 'Эпический', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
  rare: { label: 'Редкий', color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
  uncommon: { label: 'Необычный', color: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
  common: { label: 'Обычный', color: 'bg-slate-600' },
};

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState<typeof SKINS[0] | null>(null);
  const [rouletteItems, setRouletteItems] = useState<typeof SKINS>([]);

  const openCase = () => {
    setIsSpinning(true);
    setWonItem(null);

    const randomValue = Math.random() * 100;
    let cumulativeChance = 0;
    let selectedItem = SKINS[SKINS.length - 1];

    for (const skin of SKINS) {
      cumulativeChance += skin.chance;
      if (randomValue <= cumulativeChance) {
        selectedItem = skin;
        break;
      }
    }

    const items = [];
    for (let i = 0; i < 50; i++) {
      items.push(SKINS[Math.floor(Math.random() * SKINS.length)]);
    }
    items[45] = selectedItem;
    setRouletteItems(items);

    setTimeout(() => {
      setIsSpinning(false);
      setWonItem(selectedItem);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-slide-in">
          <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-4 text-glow bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            CYBERCASE
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Голографический кейс из будущего
          </p>
        </header>

        <Tabs defaultValue="simulator" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="simulator" className="font-orbitron">
              <Icon name="Box" className="mr-2 h-4 w-4" />
              Симулятор
            </TabsTrigger>
            <TabsTrigger value="gallery" className="font-orbitron">
              <Icon name="Gallery" className="mr-2 h-4 w-4" />
              Галерея
            </TabsTrigger>
            <TabsTrigger value="info" className="font-orbitron">
              <Icon name="Info" className="mr-2 h-4 w-4" />
              Инфо
            </TabsTrigger>
            <TabsTrigger value="contact" className="font-orbitron">
              <Icon name="Mail" className="mr-2 h-4 w-4" />
              Контакты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-8">
            <Card className="p-8 border-2 border-primary/50 bg-card/50 backdrop-blur-sm relative overflow-hidden group hover:border-primary transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-block animate-float">
                    <div className="text-9xl mb-4">📦</div>
                  </div>
                  <h2 className="text-3xl font-orbitron font-bold mb-2">CYBERCASE v2.0</h2>
                  <p className="text-muted-foreground">10 эксклюзивных голографических скинов</p>
                </div>

                {!isSpinning && !wonItem && (
                  <div className="text-center">
                    <Button
                      onClick={openCase}
                      size="lg"
                      className="text-xl px-12 py-6 font-orbitron neon-glow hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary"
                    >
                      <Icon name="Sparkles" className="mr-2 h-6 w-6" />
                      ОТКРЫТЬ КЕЙС
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">Нажми и испытай удачу!</p>
                  </div>
                )}

                {isSpinning && (
                  <div className="relative h-48 overflow-hidden rounded-lg border-2 border-primary/50 bg-black/50">
                    <div className="absolute inset-y-0 left-1/2 w-1 bg-primary z-20 shadow-[0_0_20px_rgba(14,165,233,0.8)]" />
                    
                    <div
                      className="absolute inset-y-0 flex items-center gap-4 px-4"
                      style={{
                        animation: 'slide-roulette 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                      }}
                    >
                      {rouletteItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex-shrink-0 w-36 h-36 rounded-lg border-2 flex flex-col items-center justify-center p-4 bg-card/80"
                          style={{ borderColor: item.color }}
                        >
                          <div className="text-5xl mb-2">{item.image}</div>
                          <p className="text-xs font-bold text-center">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {wonItem && (
                  <div className="text-center animate-scale-in">
                    <div className="inline-block p-8 rounded-xl border-4 neon-glow mb-6 bg-card/80" style={{ borderColor: wonItem.color }}>
                      <div className="text-8xl mb-4 animate-pulse-glow">{wonItem.image}</div>
                      <h3 className="text-3xl font-orbitron font-bold mb-2">{wonItem.name}</h3>
                      <Badge className={`${RARITY_INFO[wonItem.rarity as keyof typeof RARITY_INFO].color} text-white px-4 py-1`}>
                        {RARITY_INFO[wonItem.rarity as keyof typeof RARITY_INFO].label}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">Шанс: {wonItem.chance}%</p>
                    </div>
                    <Button
                      onClick={openCase}
                      size="lg"
                      className="font-orbitron"
                      variant="outline"
                    >
                      ОТКРЫТЬ ЕЩЁ РАЗ
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKINS.map((skin) => (
                <Card key={skin.id} className="p-6 border-2 hover:border-primary transition-all duration-300 group hover:scale-105 bg-card/50 backdrop-blur-sm" style={{ borderColor: `${skin.color}40` }}>
                  <div className="text-center">
                    <div className="text-6xl mb-4 group-hover:animate-float">{skin.image}</div>
                    <h3 className="text-xl font-orbitron font-bold mb-2">{skin.name}</h3>
                    <Badge className={`${RARITY_INFO[skin.rarity as keyof typeof RARITY_INFO].color} text-white mb-2`}>
                      {RARITY_INFO[skin.rarity as keyof typeof RARITY_INFO].label}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Шанс выпадения: {skin.chance}%</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info">
            <Card className="p-8 border-2 border-primary/50 bg-card/50 backdrop-blur-sm">
              <h2 className="text-3xl font-orbitron font-bold mb-6 text-primary">О кейсе CYBERCASE</h2>
              <div className="space-y-4 text-lg">
                <p>
                  <strong className="text-primary">CYBERCASE v2.0</strong> — это уникальный голографический кейс из будущего, содержащий 10 эксклюзивных скинов для оружия в игре Standoff 2.
                </p>
                <p>
                  Каждый скин обладает неоновым свечением и создан с использованием передовых технологий голографической визуализации.
                </p>
                
                <div className="mt-8">
                  <h3 className="text-2xl font-orbitron font-bold mb-4 text-secondary">Редкости и шансы:</h3>
                  <div className="space-y-3">
                    {Object.entries(RARITY_INFO).map(([key, info]) => {
                      const items = SKINS.filter(s => s.rarity === key);
                      const totalChance = items.reduce((sum, item) => sum + item.chance, 0);
                      return (
                        <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${info.color}`} />
                            <span className="font-bold">{info.label}</span>
                          </div>
                          <span className="text-muted-foreground">{totalChance}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="p-8 border-2 border-primary/50 bg-card/50 backdrop-blur-sm">
              <h2 className="text-3xl font-orbitron font-bold mb-6 text-primary">Контакты</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Icon name="Mail" className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="text-muted-foreground">cybercase@future.gg</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Icon name="MessageCircle" className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-bold">Discord</p>
                    <p className="text-muted-foreground">CyberCase#2077</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Icon name="Users" className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-bold">VK Группа</p>
                    <p className="text-muted-foreground">vk.com/cybercase_gg</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <style>{`
        @keyframes slide-roulette {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-180px * 45));
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
