package pz;

public class Weapon {
    boolean nonstopFireEnabled; //po co to?
    boolean isShootingEnabled=true;
    boolean isRealoadEnabled=true;
    int shotsInSeries;
    double shotCooldownTime;
    double seriesCooldownTime;
    double realoadTime;
    int ammo;
    int maxAmmo;
    Projectile projectile;
    
    public void reaload(){//narazie prowizoryczny, trzeba dopisac mierzenie czasu rzeczywistego dla reloada.
        this.isShootingEnabled=false; //zablokowanie strzelania i ladowania
        this.isRealoadEnabled=false;
        //tu ma byc mierzenie czasu
        this.ammo=maxAmmo;
        //odblokowanie
        this.isShootingEnabled=true;
        this.isRealoadEnabled=true;
    }
    
    public void fire(){
        if(isShootingEnabled==true){
            if(ammo>0){
                ammo--;
                projectile.collisionEffect.action(); //do opisania
            }
            if(ammo==0){
                this.reaload();
            }
        }
    }
}
//domyslny konstruktor, bo poszczegolne elementy beda zalezec od rodzaju broni
