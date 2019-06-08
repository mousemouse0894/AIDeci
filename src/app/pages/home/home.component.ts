import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  //DataTable
  public record = [
    { Name: "Sarah", Hair: "blonde", Height: "average", Weight: "light", Lotion: "no", Result: "sunburned" },
    { Name: "Dana", Hair: "blonde", Height: "tall", Weight: "average", Lotion: "yes", Result: "none" },
    { Name: "Alex", Hair: "brown", Height: "short", Weight: "average", Lotion: "yes", Result: "none" },
    { Name: "Annie", Hair: "blonde", Height: "short", Weight: "average", Lotion: "no", Result: "sunburned" },
    { Name: "Emily", Hair: "red", Height: "average", Weight: "heavy", Lotion: "no", Result: "sunburned" },
    { Name: "Pete", Hair: "brown", Height: "tall", Weight: "heavy", Lotion: "no", Result: "none" },
    { Name: "John", Hair: "brown", Height: "average", Weight: "heavy", Lotion: "no", Result: "none" },
    { Name: "Katie", Hair: "blonde", Height: "short", Weight: "light", Lotion: "yes", Result: "none" }
  ];

  //ValueResult
  public Hair: any = "0";
  public Height: any = "0";
  public Weight: any = "0";
  public Lotion: any = "0";
  public Result: any = "ANS";
  public timeprocess: number = 0;
  public threeshow:boolean;
  public buttonpro:boolean = true;
  //ValueAlgorithmRoot
  public sum = {
    sunburned: 0,
    none: 0,
    result: 0
  };

  public Entropy = {
    Result: 0,
    Hair: { blonde: 0, brown: 0, red: 0 },
    Height: { average: 0, tall: 0, short: 0 },
    Weight: { light: 0, average: 0, heavy: 0 },
    Lotion: { yes: 0, no: 0 }
  };

  public IG = {
    Hair: 0,
    Height: 0,
    Weight: 0,
    Lotion: 0
  }


  public MydataSET = {
    Hair: {
      red: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      brown: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      blonde: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      result: 0
    },
    Height: {
      tall: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      average: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      short: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      result: 0
    },
    Weight: {
      light: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      average: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      heavy: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      result: 0
    },
    Lotion: {
      yes: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      no: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      result: 0
    }
  };

  //ValueAlgorithmleafnode
  public sumleaf = {
    sunburned: 0,
    none: 0,
    result: 0
  };

  public Entropyleaf = {
    Result: 0,
    Height: { average: 0, tall: 0, short: 0 },
    Weight: { light: 0, average: 0, heavy: 0 },
    Lotion: { yes: 0, no: 0 }
  };


  public IGleaf = {
    Height: 0,
    Weight: 0,
    Lotion: 0
  }


  public MydataSETleaf = {
    Height: {
      tall: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      average: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      short: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      result: 0
    },
    Weight: {
      light: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      average: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      heavy: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      result: 0
    },
    Lotion: {
      yes: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      no: { sunburned: 0, none: 0, p: { sunburned: 0, none: 0, proot: 0, pnode: 0 } },
      result: 0
    }
  };

  constructor() {
    // this.onIGRoot();
    // this.onIGleafnode();
  }

  ngOnInit() {

  }

   public processtree(){
     this.onIGRoot();
     this.onIGleafnode();
     this.threeshow =  true;
     this.buttonpro = false;
   }
   //process
   public process(){
     if(this.Hair == "3"){
       this.Result = "Sunburned"
     }
     if(this.Hair == "2"){
      this.Result = "None"
     }
     if(this.Hair == "1" && this.Lotion == "1"){
         this.Result = "None"
     }

     if(this.Hair == "1" && this.Lotion == "2"){
      this.Result = "Sunburned"
     }
   }

  //FunctionAlgorithmRoot
  public onIGRoot() {

    for (let i = 0; i < Object.keys(this.MydataSET).length; i++) {
      let countSunburned = 0;
      let countNone = 0;
      let countroot = 0;

      this.record.forEach(e => {
        this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]][e["Result"]] += 1;
        countSunburned = this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["sunburned"];
        countNone = this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["none"];
        countroot = this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["p"]["pnode"];
        this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["p"]["pnode"] = countNone + countSunburned
        this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["p"]["none"] = countNone / (countNone + countSunburned);
        this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["p"]["sunburned"] = countSunburned / (countNone + countSunburned);
        this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["p"]["proot"] = countroot / this.sum.result
      });
    }

    this.record.forEach(e => {
      this.sum[e["Result"]] += 1;
      this.sum["result"] += 1;
    });

    this.sum.sunburned = this.sum.sunburned / this.sum.result;
    this.sum.none = this.sum.none / this.sum.result;
    this.Entropy["Result"] = -(
      this.sum.sunburned * Math.log2(this.sum.sunburned) +
      this.sum.none * Math.log2(this.sum.none)
    );

    let sumWhere = 0;
    for (let i = 1; i < Object.keys(this.Entropy).length; i++) {
      Object.keys(this.MydataSET[Object.keys(this.Entropy)[i]]).forEach(e => {
        if (e != "result") {
          sumWhere = -(this.MydataSET[Object.keys(this.Entropy)[i]][e]["p"]["sunburned"] *
            Math.log2(this.MydataSET[Object.keys(this.Entropy)[i]][e]["p"][
              "sunburned"
            ]
            ) +
            this.MydataSET[Object.keys(this.Entropy)[i]][e]["p"]["none"] *
            Math.log2(
              this.MydataSET[Object.keys(this.Entropy)[i]][e]["p"]["none"]
            )
          );

          this.Entropy[Object.keys(this.Entropy)[i]][e] = sumWhere
            ? sumWhere
            : 0;
        }
      });
    }


    for (let i = 0; i < Object.keys(this.MydataSET).length; i++) {
      let countroot = 0;
      this.record.forEach(e => {
        this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]][e["Result"]] += 1;
        countroot = this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["p"]["pnode"];
        this.MydataSET[Object.keys(this.MydataSET)[i]][e[Object.keys(this.MydataSET)[i]]]["p"]["proot"] = countroot / this.sum.result
      });
    }

    this.IG.Hair = this.Entropy.Result - ((this.MydataSET.Hair.blonde.p.proot * this.Entropy.Hair.blonde) +
      (this.MydataSET.Hair.brown.p.proot * this.Entropy.Hair.brown) +
      (this.MydataSET.Hair.red.p.proot * this.Entropy.Hair.red))

    this.IG.Height = this.Entropy.Result - ((this.MydataSET.Height.average.p.proot * this.Entropy.Height.average) +
      (this.MydataSET.Height.short.p.proot * this.Entropy.Height.short) +
      (this.MydataSET.Height.tall.p.proot * this.Entropy.Height.tall))

    this.IG.Weight = this.Entropy.Result - ((this.MydataSET.Weight.average.p.proot * this.Entropy.Weight.average) +
      (this.MydataSET.Weight.heavy.p.proot * this.Entropy.Weight.heavy) +
      (this.MydataSET.Weight.light.p.proot * this.Entropy.Weight.light))

    this.IG.Lotion = this.Entropy.Result - ((this.MydataSET.Lotion.yes.p.proot * this.Entropy.Lotion.yes) +
      (this.MydataSET.Lotion.no.p.proot * this.Entropy.Lotion.no))

    //console.log(this.IG)
    // console.log(timeEnd-timeStart)
    // console.log(this.MydataSET)
    // console.log(this.Entropy)
    // console.log(this.sum)
    console.log(this.timeprocess)
  }


  //FunctionAlgorithmleafnode
  public onIGleafnode() {

    for (let i = 0; i < Object.keys(this.MydataSETleaf).length; i++) {
      let countSunburned = 0;
      let countNone = 0;
      let countroot = 0;

      this.record.forEach(e => {
        if (e.Hair == "blonde") {
          this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]][e["Result"]] += 1;
          countSunburned = this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["sunburned"];
          countNone = this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["none"];
          countroot = this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["p"]["pnode"];
          this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["p"]["pnode"] = countNone + countSunburned
          this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["p"]["none"] = countNone / (countNone + countSunburned);
          this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["p"]["sunburned"] = countSunburned / (countNone + countSunburned);
          this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["p"]["proot"] = countroot / this.sumleaf.result
        }
      });
    }

    this.record.forEach(e => {
      if (e.Hair == "blonde") {
        this.sumleaf[e["Result"]] += 1;
        this.sumleaf["result"] += 1;
      }
    });

    this.sumleaf.sunburned = this.sumleaf.sunburned / this.sumleaf.result;
    this.sumleaf.none = this.sumleaf.none / this.sumleaf.result;
    this.Entropyleaf["Result"] = -(
      this.sumleaf.sunburned * Math.log2(this.sumleaf.sunburned) +
      this.sumleaf.none * Math.log2(this.sumleaf.none)
    );

    let sumWhere = 0;
    for (let i = 1; i < Object.keys(this.Entropyleaf).length; i++) {
      Object.keys(this.MydataSETleaf[Object.keys(this.Entropyleaf)[i]]).forEach(e => {
        if (e != "result") {
          sumWhere = -(this.MydataSETleaf[Object.keys(this.Entropyleaf)[i]][e]["p"]["sunburned"] *
            Math.log2(this.MydataSETleaf[Object.keys(this.Entropyleaf)[i]][e]["p"][
              "sunburned"
            ]
            ) +
            this.MydataSETleaf[Object.keys(this.Entropyleaf)[i]][e]["p"]["none"] *
            Math.log2(
              this.MydataSETleaf[Object.keys(this.Entropyleaf)[i]][e]["p"]["none"]
            )
          );

          this.Entropyleaf[Object.keys(this.Entropyleaf)[i]][e] = sumWhere
            ? sumWhere
            : 0;
        }
      });
    }

    for (let i = 0; i < Object.keys(this.MydataSETleaf).length; i++) {
      let countroot = 0;
      this.record.forEach(e => {
        this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]][e["Result"]] += 1;
        countroot = this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["p"]["pnode"];
        this.MydataSETleaf[Object.keys(this.MydataSETleaf)[i]][e[Object.keys(this.MydataSETleaf)[i]]]["p"]["proot"] = countroot / this.sumleaf.result
      });
    }

    this.IGleaf.Height = this.Entropyleaf.Result - ((this.MydataSETleaf.Height.average.p.proot * this.Entropyleaf.Height.average) +
      (this.MydataSETleaf.Height.short.p.proot * this.Entropyleaf.Height.short) +
      (this.MydataSETleaf.Height.tall.p.proot * this.Entropyleaf.Height.tall))

    this.IGleaf.Weight = this.Entropyleaf.Result - ((this.MydataSETleaf.Weight.average.p.proot * this.Entropyleaf.Weight.average) +
      (this.MydataSETleaf.Weight.heavy.p.proot * this.Entropyleaf.Weight.heavy) +
      (this.MydataSETleaf.Weight.light.p.proot * this.Entropyleaf.Weight.light))

    this.IGleaf.Lotion = this.Entropyleaf.Result - ((this.MydataSETleaf.Lotion.yes.p.proot * this.Entropyleaf.Lotion.yes) +
      (this.MydataSETleaf.Lotion.no.p.proot * this.Entropyleaf.Lotion.no))


    // console.log(this.MydataSETleaf)
    // console.log(this.sumleaf)
    // console.log(this.IG)
    // console.log(this.Entropyleaf)
    // console.log(this.IGleaf)
  }

}
