package pz;

public class Projectile {
   boolean rebounding;
   int damage;
   Effect collisionEffect;
   
   public Projectile(boolean reb, int dmg, Effect effect){
       this.rebounding = reb;
       this.damage = dmg;
       this.collisionEffect = effect;
   }
}
