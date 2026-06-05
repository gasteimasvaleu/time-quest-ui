## Objetivo
Aumentar o tamanho do container do dock flutuante para que o ícone do Instagram (ampliado) não fique cortado.

## Mudanças

**`src/components/ui/glass-dock.tsx`**
- Aumentar a célula de cada ícone de `w-11 h-11` para `w-14 h-14` (linha ~92), dando mais espaço interno.
- Aumentar o gap entre ícones de `gap-1.5` para `gap-2` para acomodar ícones maiores sem encostar.
- Manter o `overflow-hidden` do wrapper, mas garantir que o padding do dock (`p-2`) seja suficiente — se necessário, ajustar para `p-2.5`.

**`src/components/FloatingDock.tsx`**
- Atualizar a constante `DOCK_HEIGHT` (atualmente `68`) para `~84` para refletir a nova altura e manter o ancoramento correto no scroll.
- Remover o `scale-125` do `InstagramImg` (já não necessário) e usar `w-10 h-10` direto, ficando consistente com os demais ícones que ainda usam `w-6 h-6` — ou manter o Instagram maior proporcionalmente já que agora cabe.

## Resultado
- Dock fica visualmente maior, com espaço suficiente para o ícone do Instagram aparecer inteiro.
- Ancoragem no scroll continua correta graças ao `DOCK_HEIGHT` atualizado.
- Quando o usuário trocar os outros ícones depois, todos terão o mesmo espaço disponível.